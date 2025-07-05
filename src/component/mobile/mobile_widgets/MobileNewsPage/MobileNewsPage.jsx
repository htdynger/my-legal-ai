
import './MobileNewsPage.css'

import grayShowLessURL from '../../mobile_assets/grayShowLess.svg'
import showLessURL from '../../mobile_assets/showLess.svg'
import grayLikeURL from '../../mobile_assets/grayLike.svg'
import grayDislikeURL from '../../mobile_assets/grayDislike.svg'
import grayCopyURL from '../../mobile_assets/grayCopy.svg'

import { useNavigate } from 'react-router-dom'


const MobileNewsPage = ({ thumbnail, newsTitle, date, textTitle, textParagraph}) => {
    const navigate = useNavigate()

    console.log(thumbnail)
    return (

        <>
            <section className='news-page'>

                <header>
                    <button type='button' onClick={() => navigate('/info')}> <img src={grayShowLessURL} alt="back" /> </button>
                    <span> Новость </span>
                </header>

                <aside>

                    <header style={{backgroundImage: `url(${thumbnail})`}}>
                        <h1> {newsTitle} </h1>
                    </header>

                    <main>
                        <span> {date} </span>

                        <h2> {textTitle} </h2>

                        {textParagraph.map((paragraph, index) => {
                            return <p key={index}> {paragraph} </p>
                        })}


                        <i> </i>

                        <div>
                            <button> <img src={grayCopyURL} alt="copy" /> </button>
                            <button> <img src={grayLikeURL} alt="like" /> </button>
                            <button> <img src={grayDislikeURL} alt="dislike" /> </button>
                        </div>

                    </main>

                    <footer>
                        <button type='button' onClick={() => navigate('/info')}> 
                            <span>
                                Назад
                            </span>

                            <img src={showLessURL} alt="back" />
                        </button>
                    </footer>

                </aside>

            </section>
        </>
    )
}

export default MobileNewsPage