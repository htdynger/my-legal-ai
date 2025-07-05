import './MobileSettingsLanguageSection.css'

import uzbFlagURL from '../../mobile_assets/flags/uzb.svg'
import rusFlagURL from '../../mobile_assets/flags/rus.svg'
import falseURL from '../../mobile_assets/false.svg'

const MobileSettingsLanguageSection = () => {

    return (

        <>
            <section className='section-settings-language'>

                <header>
                    <textarea placeholder='Поиск языка' name="" id=""></textarea>
                    <button>
                        <img src={falseURL} alt="X" />
                    </button>
                </header>

                <aside>

                    <div>
                        <button>
                            <img src={uzbFlagURL} alt="" />
                            <span> O'zbek tili </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Русский язык </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Английский язык </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Испанский язык </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Французский язык </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Немецкий язык </span>
                        </button>
                    </div>

                    <div>
                        <button>
                            <img src={rusFlagURL} alt="" />
                            <span> Итальянский язык </span>
                        </button>
                    </div>


                </aside>
            </section>
        </>
    )
}

export default MobileSettingsLanguageSection