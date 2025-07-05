
import showMoreURL from '../../mobile_assets/showMore.svg'
import './MobileNewsSection.css'

import { useNavigate } from 'react-router-dom'

const MobileNewsSection = () => {

    const navigate = useNavigate()

    return (

        <section className='section-news'>

            <h1> Новости и обновления </h1>

            <section>

                <aside>

                    <div className='section-news__news-1'>

                        <div className='section-news__news-1__img'></div>

                        <div className='section-news__news-1__content'>
                            <p> 15.05.2025 </p>
                            <h2>LegAI beta: добро пожаловать в бета тест</h2>
                            <button type='button' onClick={() => navigate('/news/1')}>
                                <span> Подробнее </span>
                                <img src={showMoreURL} alt="show-more" />
                            </button>
                        </div>
                    </div>



                    <div className='section-news__news-2'>

                        <div className='section-news__news-2__img'></div>
                        <div className='section-news__news-2__content'>
                            <p> 15.05.2025 </p>
                            <h2>LegAI beta: добро пожаловать в бета тест</h2>
                            <button type='button' onClick={() => navigate('/news/2')}>
                                <span> Подробнее </span>
                                <img src={showMoreURL} alt="show-more" />
                            </button>
                        </div>

                    </div>

                    <div className='section-news__news-3'>

                        <div className='section-news__news-3__img'></div>
                        <div className='section-news__news-3__content'>
                            <p> 15.05.2025 </p>
                            <h2>Вот определение статьи АК 47</h2>
                            <button type='button' onClick={() => navigate('/news/3')}>
                                <span> Подробнее </span>
                                <img src={showMoreURL} alt="show-more" />
                            </button>
                        </div>

                    </div>

                </aside>

            </section>
        </section>
    )
}

export default MobileNewsSection