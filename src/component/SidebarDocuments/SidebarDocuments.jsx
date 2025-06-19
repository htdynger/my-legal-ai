import documentsIconURL from './items/documentsIcon.png'
import './SidebarDocuments.css'

const SidebarDocuments = ({date, title, documents}) => {
    



    function getFileWord(number) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
    
        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return 'файл';
        } else if (
            (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return 'файла';
        } else {
            return 'файлов';
        }
    }
    

    return (
        <>
        
            {Array.isArray(documents) ? 
                
                <div className="sidebarDocuments-container"> 

                    <p className="sidebarDocuments-container__date-text"> {date} </p>
                    
                    <div className='sidebarDocuments-container__documents-container'>
                        
                        <div className='sidebarDocuments-container__documents-container__section-n1'>
                            <img src={documentsIconURL} alt="documents-icon" />
                        </div>

                        <div className='sidebarDocuments-container__documents-container__section-n2'>
                            <div className='sidebarDocuments-container__documents-container__section-n2__text-n1'> {title} </div>
                            <div className='sidebarDocuments-container__documents-container__section-n2__text-n2'> 
                                {`${documents.length} ${getFileWord(documents.length)}`}
                            </div>
                        </div>
                    </div>

                </div>
            
            :

            <h1> asd </h1>
            
            }
        </>
    )
}

export default SidebarDocuments