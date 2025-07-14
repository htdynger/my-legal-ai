import './DocumentGeneration.css';
import './style/DocumentGenerationAi.css'
import './style/DocumentSection.css'

import animatedFrameFragmentURL from './items/animated-frame-fragment.mp4'
import previewTextURL from './items/previewText.png'


import documentGenerationAiPreviewSmallURL from './items/documentGenerationAiPreviewSmall.mp4';

import toggleButtonLogoURL from './items/toggleButtonLogo.png';
import closeDropdownButtonURL from './items/closeDropdownButton.png';

import textAlignStartIconURL from './items/textAlignStartIcon.png';
import textAlignCenterIconURL from './items/textAlignCenterIcon.png';
import textAlignEndIconURL from './items/textAlignEndIcon.png';

import textDecoration1IconURL from './items/textDecoration1Icon.png';
import textDecoration2IconURL from './items/textDecoration2Icon.png';
import textDecoration3IconURL from './items/textDecoration3Icon.png';

import accordionOpenButtonIconURL from './items/accordionOpenButtonIcon.png';
import accordionCloseButtonIconURL from './items/accordionCloseButtonIcon.png';

import eyeIconURL from './items/eyeIcon.png';
import { v4 as uuidv4 } from 'uuid';

import icon_1URL from './items/headerButtons/icon_1.png';
import icon_2URL from './items/headerButtons/icon_2.png';
import icon_3URL from './items/headerButtons/icon_3.png';
import icon_4URL from './items/headerButtons/icon_4.png';
import icon_5URL from './items/headerButtons/icon_5.png';
import icon_6URL from './items/headerButtons/icon_6.png';
import icon_7URL from './items/headerButtons/icon_7.png';

import icon_1_enabledURL from './items/headerButtons/icon_1_enabled.png';
import icon_2_enabledURL from './items/headerButtons/icon_2_enabled.png';
import icon_3_enabledURL from './items/headerButtons/icon_3_enabled.png';
import icon_4_enabledURL from './items/headerButtons/icon_4_enabled.png';
import icon_5_enabledURL from './items/headerButtons/icon_5_enabled.png';

import addFileButtonURL from './items/inputButtons/addFileButton.png';
import copyButtonURL from './items/inputButtons/copyButton.png';
import flagUzbURL from './items/inputButtons/flagUzb.png';
import sendButtonURL from './items/inputButtons/sendButton.png';

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { FontFamily } from "@tiptap/extension-font-family";

import { FontWeight } from '../../utils/FontWeight';
import { FontSize } from '../../utils/FontSize';
import { FontColor } from '../../utils/FontColor';

import { useRef, useState, useCallback, useEffect } from 'react';
import React from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, ImageRun } from 'docx';
import { saveAs } from 'file-saver';

import ComingSoon from '../../animation/ComingSoon/ComingSoon';

import { useVisualStore } from '../../store/useVisualStore';
import { useChatStore } from '../../store/useChatStore';
import MiniMessenger from '../MiniMessenger/MiniMessenger';
import fontIconUrl from './items/fontIcon.png'
const EditorWrapper = ({ content, editorRef }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Strike, 
      TextStyle,
      FontFamily,
      FontWeight,
      FontSize,
      FontColor,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
    ],
    content,
  });

  if (editor && editorRef) {
    editorRef.current = editor;
  }

  return <EditorContent editor={editor} />;
};

const DocumentSection = () => {

  const { isSidebarHidden, toggleSidebar } = useVisualStore();
  const [pages, setPages] = useState([
    { id: 1, content: '<p>Введите текст здесь...</p>', ref: React.createRef() },
  ]);
  const [documentName, setDocumentName] = useState('Новый документ');
  const [activePageIndex, setActivePageIndex] = useState(0);

  const addNewPage = () => {
    const newPage = {
      id: pages.length + 1,
      content: '<p>Новая страница...</p>',
      ref: React.createRef(),
    };
    setPages((prev) => [...prev, newPage]);
    setActivePageIndex(pages.length); // делаем новую страницу активной
  };

  const exportToDocx = useCallback(() => {
    const paragraphs = [];

    pages.forEach((page, index) => {
      const editor = page.ref.current;
      if (!editor) return;
      const json = editor.getJSON();

      for (const node of json.content || []) {
        if (node.type === 'image' && node.attrs?.src?.startsWith('data:image')) {
          const base64 = node.attrs.src.split(',')[1];
          const mimeType = node.attrs.src.split(';')[0].split(':')[1];
          const format = mimeType.split('/')[1];

          try {
            const imageBuffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
            const image = new ImageRun({
              data: imageBuffer,
              transformation: {
                width: 400,
                height: 300,
              },
            });
            paragraphs.push(new Paragraph({ children: [image] }));
          } catch (err) {
            console.error('Ошибка вставки изображения:', err);
          }

          continue;
        }

        if (node.type === 'paragraph' || node.type === 'heading') {
          const alignmentStr = node.attrs?.textAlign || 'left';
          let alignment = AlignmentType.LEFT;
          if (alignmentStr === 'center') alignment = AlignmentType.CENTER;
          else if (alignmentStr === 'right') alignment = AlignmentType.RIGHT;
          else if (alignmentStr === 'justify') alignment = AlignmentType.JUSTIFY;

          const children = [];
          for (const child of node.content || []) {
            if (child.type === 'text') {
              const marks = child.marks || [];

              let color, fontSize, fontFamily;
              let bold = false,
                italic = false,
                underline = false,
                strike = false;

              for (const mark of marks) {
                if (mark.type === 'fontColor') color =
                  mark.attrs?.color?.replace('#', '');
                if (mark.type === 'fontSize') {
                  const size = parseInt(mark.attrs?.size?.replace('px', ''), 10);
                  if (!isNaN(size)) fontSize = size * 2;
                }
                if (mark.type === 'fontWeight') {
                  const weight = parseInt(mark.attrs?.weight, 10);
                  if (!isNaN(weight) && weight >= 700) bold = true;
                }
                if (mark.type === 'fontFamily') fontFamily =
                  mark.attrs?.fontFamily;
                if (mark.type === 'textStyle' && mark.attrs?.fontFamily)
                  fontFamily = mark.attrs.fontFamily;
                if (mark.type === 'textStyle' && mark.attrs?.fontSize)
                  fontSize = parseInt(mark.attrs.fontSize);
                if (mark.type === 'textStyle' && mark.attrs?.color)
                  color = mark.attrs.color.replace('#', '');
              }

              children.push(
                new TextRun({
                  text: child.text || '',
                  color,
                  size: fontSize,
                  font: fontFamily ? { name: fontFamily } : undefined,
                  bold,
                  italics: italic,
                  underline: underline ? {} : undefined,
                  strike,
                })
              );
            }
          }

          paragraphs.push(new Paragraph({ alignment, children }));
        }
      }

      if (index < pages.length - 1) {
        paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
      }
    });

    const doc = new Document({ sections: [{ children: paragraphs }] });

    try {
      Packer.toBlob(doc).then((blob) => saveAs(blob, `${documentName}.docx`));
    } catch (error) {
      console.error('Ошибка при экспорте в DOCX:', error);
    }
  }, [pages, documentName]);

  const [dragScrollData, setdragScrollData] = useState({
    isDown: false,
    startX: null,
    startY: null,
    scrollLeft: null,
    scrollTop: null,
  });

  const scrollRef = useRef();

  const [isDragScrollEnabled, setIsDragScrollEnabled] = useState(true);
  const [isTextChangeEnabled, setIsTextChangeEnabled] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    
    if (!container) return;
    container.width = ``
    const handleMouseDown = (e) => {
      setdragScrollData(prev => ({
        ...prev,
        isDown: true,
        startX: e.pageX - container.offsetLeft,
        startY: e.pageY - container.offsetTop,
        scrollLeft: container.scrollLeft,
        scrollTop: container.scrollTop,
      }));
    };

    const handleMouseLeave = () => {
      if(!isDragScrollEnabled) return;
      setdragScrollData(prev => ({ ...prev, isDown: false }));
    };

    const handleMouseUp = () => {
      if(!isDragScrollEnabled) return;
      setdragScrollData(prev => ({ ...prev, isDown: false }));
    };

    const handleMouseMove = (e) => {
      if(!isDragScrollEnabled) return;
      if (!dragScrollData.isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = x - dragScrollData.startX;
      const walkY = y - dragScrollData.startY;
      container.scrollLeft = dragScrollData.scrollLeft - walkX;
      container.scrollTop = dragScrollData.scrollTop - walkY;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragScrollData]);

  const fileInputRef = useRef(null);

  const handleInsertImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      const editor = pages[activePageIndex]?.ref.current;
      if (editor) {
        editor.chain().focus().setImage({ src: base64 }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const editorPageWrapperRef = useRef();
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    const wrappers = document.querySelectorAll('.editor-page-wrapper');
    wrappers.forEach((el) => {
      el.style.zoom = isZoomed ? 1.0 : 1.5;
    });
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={isSidebarHidden ? 'content content-sidebar-hidden' : 
      'content content-sidebar-visible'}>
        <ComingSoon />
      <div className={isSidebarHidden ? 'document-generation document-generation-sidebar-opened' : 'document-generation document-generation-sidebar-closed'}>
        <div className="document-generation__header">
          <input
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="document-generation__header__title-input"
          />
          <div className="document-generation__header__button-section">
            <div className={isDragScrollEnabled ? 'active' : ''} onClick={() => 
                setIsDragScrollEnabled(!isDragScrollEnabled)}>
              <button><img src={icon_1_enabledURL} alt='button-icon-n1' /></button>
            </div>
            <div className={isTextChangeEnabled ? 'active' : ''} onClick={() => 
                setIsTextChangeEnabled(!isTextChangeEnabled)}>
              <button><img src={icon_2_enabledURL} alt='button-icon-n2' /></button>
            </div>
            <div onClick={addNewPage}>
              <button><img src={icon_3_enabledURL} alt='button-new-page' /></button>
            </div>
            <div><button onClick={() => fileInputRef.current?.click()}><img 
                src={icon_4_enabledURL} alt='button-add-picture' /></button></div>
            <div onClick={exportToDocx}>
              <button><img src={icon_5_enabledURL} alt='button-save-docx' /></button>
            </div>
            <div><button><img src={icon_6URL} alt='button-icon-n6' /></button></div>
            <div><button><img src={icon_7URL} alt='button-icon-n7' /></button></div>
            <div onClick={handleZoom}>
              <p>{isZoomed ? '150' : '100'}</p><p>%</p>
            </div>
          </div>
        </div>
        <div 
          
          className="document-generation__main"
        >
          <div ref={scrollRef} className='document-generation__main__scroll-feature'>
            <div className={isTextChangeEnabled ? 'opened' : 'locked'}></div>
            {pages.map((page, index) => (
              <div
                key={page.id}
                className={`editor-page-wrapper ${index === activePageIndex ? 'active-page' : ''}`}
                onClick={() => setActivePageIndex(index)}
                ref={editorPageWrapperRef}
              >
                <EditorWrapper content={page.content} editorRef={page.ref} />
              </div>
            ))}
          </div>

          <input
            type="file" multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleInsertImage}
          />
        </div>
      </div>

      {pages[activePageIndex] && (
        <DocumentGenerationAi editorProp={pages[activePageIndex].ref.current} />
      )}
    </div>
  );
};

const DocumentGenerationAi = ({ editorProp }) => {



    const { selectedChat, data, setData, handleSelectChat, unSelectChat, sendButtonEnabled, hardSetSelectedChat } = useChatStore()
    const { toggleChat, closeChat } = useVisualStore()



    useEffect(() => {
      closeChat()
      unSelectChat()
    }, [])
    const bigVideoRef = useRef();
    const smallVideoRef = useRef();
    const messengerRef = useRef();

    

    const [messageText, setMessageText] = useState('')


    const handleSendMessage = () => {


        if (!sendButtonEnabled) return
        
        if (messageText.trim() === '') return

        bigVideoRef.current.classList.add('hidden');
        smallVideoRef.current.classList.add('hidden');
        messengerRef.current.style.display = `block`


        setMessageText('')

        toggleChat()

        setTimeout(() => {
          messengerRef.current.scrollTo({
            top: messengerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }, 50)


        if (selectedChat === false) {

            // REST : POST /{organization_id}/chats Create Chat

            // websockets связь

            const id = uuidv4(); 
            console.log(data)
            let initialState = [...data]
            console.log(data)



            initialState.push(
                {
                    title: messageText,
                    id: id,
                    message: [
                        {
                            "author": "user",
                            "message": messageText.trim(),
                            "date": "1"
                        },
                        {
                            "author": "ai",
                            "title": "lorem ipsum",
                            "message": "4343234 ipsum 4343234 sit lorem ipsum dolor sitlorem 4343234 dolor sit lorem 4343234 dolor sitlorem ipsum 4343234 sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sitlorem ipsum dolor sit lorem ipsum dolor sit",
                            "date": "1",
                        },
                    ]
                }   
            )

            setData(initialState)
            handleSelectChat(id)
            
        } else {

            let initialState = {...selectedChat}
          


            
            
            // websockets связь

            
            initialState.message.push(

                {
                    "author": "user",
                    "message": messageText,
                    "date": "1"
                },
                {
                    "author": "ai",
                    "title": "",
                    "message": "",
                    "date": "1",
                },
            )    
            // setData(initialState)

            hardSetSelectedChat(initialState)

        }
    };

    const textAlignStartButtonRef = useRef();
    const textAlignCenterButtonRef = useRef();
    const textAlignEndButtonRef = useRef();

    const [isColorContentVisible, setIsColorContentVisible] = useState(true);

    const textAlignButtonRefs = [textAlignStartButtonRef, textAlignCenterButtonRef, textAlignEndButtonRef];

    const toggleAlignText = (buttonHasClicked, side) => {
        textAlignButtonRefs.forEach((e) => {
            e.current.classList.remove('text-align-selected');
        });

        buttonHasClicked.current.classList.add('text-align-selected');
        editorProp.chain().focus().setTextAlign(side).run();
    };

    const toggleEditorMenu = () => {

          setIsEditorMenuVisible(!isEditorMenuVisible)
          documentGenerationAiRef.current.classList.toggle('visible');





        messengerRef.current.classList.remove('messenger-animation')
        void messengerRef.current.offsetWidth
        messengerRef.current.classList.add('messenger-animation')


    };



    const [isEditorMenuVisible, setIsEditorMenuVisible] = useState(false);
    const documentGenerationAiRef = useRef();






    const fonts = ["Arial", "Georgia", "Courier New", "Times New Roman"];
    
    const weights = [
        { value: "400", label: "Regular" },
        { value: "500", label: "Medium" },
        { value: "600", label: "Semibold" },
        { value: "700", label: "Bold" },
        { value: "900", label: "Black" },
    ];
    const fontSizes = Array.from({ length: 11 }, (_, i) => i + 10);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFont, setSelectedFont] = useState(fonts[0]);

    const [isWeightDropdownOpen, setWeightDropdownOpen] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(weights[1].label);

    const [isFontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);
    const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[6]);

    const handleFontSelect = (font) => {
        setSelectedFont(font);
        editorProp.chain().focus().setFontFamily(font).run();
        setDropdownOpen(false);
    };
    const handleFontWeightSelect = (weight) => {
        setSelectedWeight(weight.label);
        editorProp.chain().focus().setFontWeight(weight.value).run();
        setWeightDropdownOpen(false);
        console.log(selectedWeight)
    };
    const handleFontSizeSelect = (size) => {
        setSelectedFontSize(size);
        editorProp.chain().focus().setFontSize(`${size}px`).run();
        setFontSizeDropdownOpen(false);
    };

    // Состояние для хранения введённого кода цвета (без '#')
    const [colorInput, setColorInput] = useState(
      (editorProp?.getAttributes?.("fontColor")?.color || "#FFFFFF").replace(/^#/,'')
    );
    // Обработчик изменения цвета: обрезаем до 6 символов и применяем, если длина == 6
    const handleColorChange = (e) => {
      let value = e.target.value.replace(/^#/,'').slice(0, 6);
      setColorInput(value);
      if (value.length === 6 && editorProp) {
        editorProp.chain().focus().setFontColor(`#${value}`).run();
      }
    };
    

    useEffect(() => {
      if (isEditorMenuVisible) {
        setTimeout(() => {

          messengerRef.current.scrollTo({
            top: messengerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }, 900)
      }

    }, [isEditorMenuVisible])

    
    return (
        <div className="document-generation-ai">
            <div ref={documentGenerationAiRef} className="document-generation-ai__header"> 
                <div className="document-generation-ai__header__burger-section">
                    <p className="document-generation-ai__header__burger-section__text"> Редактор </p>
                    <button onClick={toggleEditorMenu} className="document-generation-ai__header__burger-section__button">
                        <img src={toggleButtonLogoURL} alt="toggle-button" />
                    </button>
                </div>

                <div className="document-generation-ai__header__settings-section"> 
                    
                    <div className="document-generation-ai__header__settings-section__content">
                        
                        <div className="document-generation-ai__header__settings-section__content__text-editor-container">

                            <p className="document-generation-ai__header__settings-section__content__text-editor-container__text"> Настройка 
                        текста </p>

                            <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n1"> 

                                <div className={`custom-dropdown 
${isDropdownOpen ? 'open' : ''}`} onClick={() => 
setDropdownOpen(!isDropdownOpen)}>
                                    <div style={{"fontFamily": selectedFont}} className="custom-dropdown__selected">{selectedFont}</div>

                                    <div className="custom-dropdown__list-container">

                                        <div className="custom-dropdown__list-container__header">
                                            <p className="custom-dropdown__list-container__header__text"> Гарнитура </p>

                                            <button className="custom-dropdown__list-container__header__button"> <img src={closeDropdownButtonURL} 
alt="close-dropdown-button" /> </button>
                                        </div>


                                        <div className="custom-dropdown__list-container__list">
                                          <section>
                                            {fonts.map((font) => (
                                                <div key={font} className={selectedFont === font ? "custom-dropdown__option option-selected" : "custom-dropdown__option"} onClick={() => handleFontSelect(font)}>
                                                  <img src={fontIconUrl} alt="icon" /> <span> {font} </span> 
                                                </div>
                                            ))}
                                          </section>

                                        </div>

                                    </div>

                                        

                                </div>
                            </div>

                            <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n2"> 
                                <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n2__select-font-weight-container">

                                    <div className={`custom-dropdown-weight 
${isWeightDropdownOpen ? 'open' : ''}`} onClick={() => 
setWeightDropdownOpen(!isWeightDropdownOpen)}>
                                        <div className="custom-dropdown__weight__selected">{selectedWeight}</div>

                                        <div className="custom-dropdown-weight__list-container">

                                            <div className="custom-dropdown-weight__list-container__list">
                                                {weights.map((weight) => (
                                                    <div
                                                      key={weight.value}
                                                      className={selectedWeight === weight.label ? "custom-dropdown-weight__option weight-option-selected" : "custom-dropdown-weight__option"}
                                                      onClick={() => handleFontWeightSelect(weight)}
                                                    >
                                                    {weight.label}
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n2__select-font-size-container">
                                    <div className="custom-dropdown-size- container">
                                        <div
                                            className={`custom-dropdown-size ${isFontSizeDropdownOpen ? 'open' : ''}`}
                                            onClick={() => 
setFontSizeDropdownOpen(!isFontSizeDropdownOpen)}
                                        >
                                            
                                            <div className="custom-dropdown-size__selected">
                                                {selectedFontSize}
                                            </div>

                                            <div className="custom-dropdown-size__button">
                                            </div>

                                            <div className="custom-dropdown-size__list-container">
                                                {fontSizes.map((size) => (
                                                    <div
                                                        key={size}
                                                        className="custom-dropdown-size__option"
                                                        onClick={() => 
handleFontSizeSelect(size)}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n3"> 
                                
                                <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n3__select-text-align">

                                    <button ref={textAlignStartButtonRef} 
onClick={()=>toggleAlignText(textAlignStartButtonRef, 'left')} 
className="text-align-selected"><img src={textAlignStartIconURL} alt="" /></button>
                                    <button ref={textAlignCenterButtonRef} 
onClick={()=>toggleAlignText(textAlignCenterButtonRef, 'center')} 
className=""><img src={textAlignCenterIconURL} alt="" /></button>
                                    <button ref={textAlignEndButtonRef} 
onClick={()=>toggleAlignText(textAlignEndButtonRef, 'right')} className=""><img 
src={textAlignEndIconURL} alt="" /></button>

                                </div>

                                <div className="document-generation-ai__header__settings-section__content__text-editor-container__section-n3__select-text-attributes">

                                    <button className="text-align-selected"><img
src={textDecoration1IconURL} alt="" /></button>
                                    <button className=""><img 
src={textDecoration2IconURL} alt="" /></button>
                                    <button className=""><img 
src={textDecoration3IconURL} alt="" /></button>

                                </div>

                            </div>

                            <div className="document-generation-ai__header__settings-section__content__text-color-container">

                                <div className="document-generation-ai__header__settings-section__content__text-color-container__header"> 
                                    <p className="document-generation-ai__header__settings-section__content__text-color-container__header__text"> Цвет
</p>
                                    <button onClick={() => 
setIsColorContentVisible(true)} className={isColorContentVisible ? 'document-generation-ai__header__settings-section__content__text-color-container__header__button hidden' : 'document-generation-ai__header__settings-section__content__text-color-container__header__button'}> <img src={accordionOpenButtonIconURL} alt="accordion-open-button" /> </button>
                                </div>

                                <div className={isColorContentVisible ? 'document-generation-ai__header__settings-section__content__text-color-container__main visible' : 'document-generation-ai__header__settings-section__content__text-color-container__main'}>
                                    <div className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1">
                                        <div className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__color-section">
                                            <div className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__color-section__demo-color"></div>
                                            {/* Поле ввода цвета без решётки */}
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={colorInput}
                                                onChange={handleColorChange}
                                                className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__color-section__color-input"
                                            />
                                        </div>

                                        <div className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__opacity-section">
                                            <input type="text" defaultValue={'100'} 
className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__opacity-section__opacity-input"/>
                                            <p className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n1__opacity-section__text"> % </p>
                                        </div>
                                    </div>

                                    <div className="document-generation-ai__header__settings-section__content__text-color-container__main__section-n2">
                                        <button><img src={eyeIconURL} alt="eye-icon-button" /></button>
                                        <button onClick={() => setIsColorContentVisible(false)}>
                                          <img src={accordionCloseButtonIconURL} alt="accordion-close-button" />
                                        </button>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>

            <div className={isEditorMenuVisible ? 'document-generation-ai__main small' : 'document-generation-ai__main'}>
              <div className='animated-frame-big-parent'>

                  <video
                      className="animated-frame-big__top-section"
                      src={animatedFrameFragmentURL}
                      autoPlay
                      loop
                      muted
                      playsInline
                      ref={bigVideoRef}
                  />
                  <img src={previewTextURL} alt="text" />
                  <video
                      className="animated-frame-bottom-section"
                      src={animatedFrameFragmentURL}
                      autoPlay
                      loop
                      muted
                      playsInline
                      ref={bigVideoRef}
                  />
              </div>


                <video
                    className="animated-frame-small"
                    src={documentGenerationAiPreviewSmallURL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    ref={smallVideoRef}
                />

                <div ref={messengerRef} className={isEditorMenuVisible ? "messenger mini-messenger fixxx" : "messenger fixxx"}>
                  <MiniMessenger />
                </div>
            </div>

            <div className="document-generation-ai__input-section">
                <textarea value={messageText} onChange={(e)=> setMessageText(e.target.value)} className="document-generation-ai__input-section__message-input" placeholder='Начните писать' type="text" />
                <div className="document-generation-ai__input-section__button-section">
                    <div className="document-generation-ai__input-section__button-section__left-buttons">
                        {/* <div className="document-generation-ai__input-section__button-section__left-buttons__container">
                            <button className="button-n1">
                                <img src={flagUzbURL} alt="change-language-icon" />
                            </button>
                            <button className="button-n2">
                                <img src={copyButtonURL} alt="copy-button-icon" />
                            </button>
                        </div> */}
                        <button className="button-n3">
                            <img src={addFileButtonURL} alt="add-file-button" />
                        </button>
                    </div>
                    <button onClick={handleSendMessage} className={sendButtonEnabled ? "document-generation-ai__input-section__button-section__right-buttons" : "document-generation-ai__input-section__button-section__right-buttons disabled"}>
                        <img src={sendButtonURL} alt="send-button-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DocumentGeneration = () => {
    return <DocumentSection />;
};

export default DocumentGeneration;
