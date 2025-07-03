

import showMoreURL from '../mobile_assets/showMore.svg'



import AI_URL from './item/AI.png'




import './MobileInfo.css'
import MobileBetaPromoSection from '../mobile_widgets/MobileBetaPromoSection/MobileBetaPromoSection'
import MobileInfoStatusSection from '../mobile_widgets/MobileInfoStatusSection/MobileInfoStatusSection'
import MobileNewsSection from '../mobile_widgets/MobileNewsSection/MobileNewsSection'
import MobileOpportunitySection from '../mobile_widgets/MobileOpportunitySection/MobileOpportunitySection'
import MobileUpgradeSectionMini from '../mobile_widgets/MobileUpgradeSectionMini/MobileUpgradeSectionMini'
const MobileInfo = () => {

    return (

        <>
            <div className='info-750-wrapper'> 
                <main className="info-750"> 

                    <MobileBetaPromoSection />

                    <MobileInfoStatusSection />

                    <MobileNewsSection />

                    <MobileOpportunitySection />

                    <MobileUpgradeSectionMini />


                </main>
            </div>
        </>
    )
}

export default MobileInfo