
import './MobileSettingsOptionsSection.css'
import showMoreURL from '../../mobile_assets/grayShowMore.svg'

import icon_1URL from './item/icon-1.svg'
import icon_2URL from './item/icon-2.svg'
import icon_3URL from './item/icon-3.svg'
import icon_4URL from './item/icon-4.svg'
import icon_5URL from './item/icon-5.svg'

const MobileSettingsOptionsSection = () => {

    return (

        <>
            <section className='section-settings-options'>
                <header>
                    <div>
                        <img src={icon_1URL} alt="" />
                    </div>
                    <span>
                        Смена темы
                    </span>

                    <div>
                        <button className='selected'> Тёмная </button>
                        <button> Светлая </button>
                    </div>

                </header>

                <section>
                    <div>
                        <img src={icon_2URL} alt="" />
                    </div>

                    <span>
                        Язык сайта
                    </span>

                    <button>
                        <img src={showMoreURL} alt="show-more" />
                    </button>
                </section>

                <section>
                    <div>
                        <img src={icon_3URL} alt="" />
                    </div>

                    <span>
                        Удалить все чаты
                    </span>

                    <button>
                    <img src={showMoreURL} alt="show-more" />

                    </button>
                </section>

                <section>
                    <div>
                        <img src={icon_4URL} alt="" />
                    </div>

                    <span>
                        Сменить законодательство 
                    </span>

                    <button>
                    <img src={showMoreURL} alt="show-more" />

                    </button>
                </section>


                <section>
                    <div>
                        <img src={icon_5URL} alt="" />
                    </div>

                    <span>
                        Автопояснение
                    </span>

                    <button>
                        <img src={showMoreURL} alt="show-more" />
                    </button>
                </section>

            </section>
        </>
    )
}

export default MobileSettingsOptionsSection