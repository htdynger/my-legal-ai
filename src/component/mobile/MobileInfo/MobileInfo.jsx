
import character_1URL from './item/character-1.png'

import showMoreURL from './item/showMore.png'

import section_2_iconURL from './item/section-2-icon.png'
import proLogoURL from './item/proLogo.png'

import news_1URL from './item/news-1.png'
import news_2URL from './item/news-2.jpg'
import news_3URL from './item/news-3.png'

import AI_URL from './item/AI.png'

import './MobileInfo.css'
const MobileInfo = () => {

    return (

        <>
            <div className='info-750-wrapper'> 
                <main className="info-750"> 

                    <section className='info-750__section-1'>
                        <div className='info-750__section-1__content'>

                            <div>

                                <h1>
                                    <p>LEG AI BETA: ДОБРО</p>
                                    <p>ПОЖАЛОВАТЬ В</p>
                                    <p>БЕТА ТЕСТ</p>
                                </h1>

                                <span>
                                    <p>Станьте одним из первых</p>
                                    <p>пользователей нейросети юриста</p>
                                </span>

                                <button>
                                    <span> Подробнее </span>
                                    <img src={showMoreURL} alt="show-more" />
                                </button>

                            </div>


                        </div>

                        <div className='info-750__section-1__img'>
                            <img src={character_1URL} alt="character" />
                        </div>

                    </section>


                    <section className='info-750__section-2'>
                        <aside> 
                            <div>
                                <div><img src={section_2_iconURL} alt="icon" /></div>
                                <p> Заряд кредитов: </p>
                                <p> 1500/1500 </p>
                            </div>

                            <div>
                                <div><img src={section_2_iconURL} alt="icon" /></div>
                                <p> Сообщений за сегодня:</p>
                                <p> 0 </p>
                            </div>

                            <div>
                                <i className='info-750-container'>
                                    <div>Pro</div>
                                    <p> Подписка: </p>
                                </i>

                                <p className='info-750__section-2__div-3__status'> Неактивна </p>
                            </div>

                        </aside>
                    </section>


                    <section className='info-750__section-3'>

                        <h1> Новости и обновления </h1>

                        <section>

                            <aside>

                                <div className='info-750__section-3__news-1'>

                                    <div className='info-750__section-3__news-1__img'></div>

                                    <div className='info-750__section-3__news-1__content'>
                                        <p> 15.05.2025 </p>
                                        <h2>LegAI beta: добро пожаловать в бета тест</h2>
                                        <button>
                                            <span> Подробнее </span>
                                            <img src={showMoreURL} alt="show-more" />
                                        </button>
                                    </div>
                                </div>



                                <div className='info-750__section-3__news-2'>

                                    <div className='info-750__section-3__news-2__img'></div>
                                    <div className='info-750__section-3__news-2__content'>
                                        <p> 15.05.2025 </p>
                                        <h2>LegAI beta: добро пожаловать в бета тест</h2>
                                        <button>
                                            <span> Подробнее </span>
                                            <img src={showMoreURL} alt="show-more" />
                                        </button>
                                    </div>

                                </div>

                                <div className='info-750__section-3__news-3'>

                                    <div className='info-750__section-3__news-3__img'></div>
                                    <div className='info-750__section-3__news-3__content'>
                                        <p> 15.05.2025 </p>
                                        <h2>Вот определение статьи АК 47</h2>
                                        <button>
                                            <span> Подробнее </span>
                                            <img src={showMoreURL} alt="show-more" />
                                        </button>
                                    </div>

                                </div>

                            </aside>

                        </section>
                    </section>




                    <section className='info-750__section-4'>
                        <h1>Возможности LEG AI</h1>

                        <section>

                            <aside>

                                <div className='info-750__section-4__opportunity-1'></div>
                                <div className='info-750__section-4__opportunity-2'></div>
                                <div className='info-750__section-4__opportunity-3'></div>

                            </aside>


                        </section>

                    </section>



                    <section className='info-750__section-5'>

                        <div>
                            <p> Leg </p> 
                            <img src={AI_URL} alt="AI" />
                            <p> Pro </p>
                        </div>

                        <span>

                            <h1>
                                <p>РАСШИРЬТЕ СВОИ</p>
                                <p>ВОЗМОЖНОСТИ С</p>
                                <p>PRO</p>
                            </h1>

                            <h2>
                                <p>Раздвиньте границы с помощью</p>
                                <p>расширенного доступа.</p>
                            </h2>

                        </span>

                        <button>
                            <span> Оформить подписку </span>
                            <img src={showMoreURL} alt="show-more" />
                        </button>

                    </section>


                </main>
            </div>
        </>
    )
}

export default MobileInfo