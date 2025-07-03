

import './MobileFAQSection.css'
import showMoreAnimatedURL from '../../mobile_assets/showMore-animated.svg'
import { useState } from 'react'

const MobileFAQSection = () => {

    const [isAccordionOpened, setIsAccordionOpened] = useState([false, false])

    return (

        
        <section className='section-FAQ'>

            <h1> ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ </h1>

            <div>
                <header>
                    <span> Информация о компании </span> 
                    
                    <button
                        onClick={() =>
                            setIsAccordionOpened(prev => {
                            const initialState = [...prev];
                            initialState[0] = !initialState[0];
                            return initialState;
                            })
                        }
                        >
                        <img
                            className={isAccordionOpened[0] ? 'accordion-opened-animation' : 'accordion-closed-animation'}
                            src={showMoreAnimatedURL}
                            alt="show"
                        />
                    </button>

                </header>

                <section className={isAccordionOpened[0] ? 'accordion-opened-animation' : 'accordion-closed-animation'}>
                Наша команда состоит из квалифицированных специалистов, обладающих глубокими знаниями в области перестрахования и анализа страховых рисков. Мы следуем международным стандартам и постоянно совершенствуем свой опыт.
                </section>

            </div>

            <div>
                <header>
                    <span> Информация о компании </span> 
                    
                    <button
                        onClick={() =>
                            setIsAccordionOpened(prev => {
                            const initialState = [...prev];
                            initialState[1] = !initialState[1];
                            return initialState;
                            })
                        }
                        >
                        <img
                            className={isAccordionOpened[1] ? 'accordion-opened-animation' : 'accordion-closed-animation'}
                            src={showMoreAnimatedURL}
                            alt="show"
                        />
                    </button>

                </header>

                <section className={isAccordionOpened[1] ? 'accordion-opened-animation' : 'accordion-closed-animation'}>
                Наша команда состоит из квалифицированных специалистов, обладающих глубокими знаниями в области перестрахования и анализа страховых рисков. Мы следуем международным стандартам и постоянно совершенствуем свой опыт.
                </section>

            </div>


        </section>
    )
}

export default MobileFAQSection