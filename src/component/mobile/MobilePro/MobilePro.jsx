
import './MobilePro.css'



import MobileUpgradeSection from '../mobile_widgets/MobileUpgradeSection/MobileUpgradeSection'
import MobileTariffSection from '../mobile_widgets/MobileTariffSection/MobileTariffSection'
import MobileOptionSection from '../mobile_widgets/MobileOptionsSection/MobileOptionSection'
import MobileOpportunitySection from '../mobile_widgets/MobileOpportunitySection/MobileOpportunitySection'
import MobileFAQSection from '../mobile_widgets/MobileFAQSection/MobileFAQSection'

const MobilePro = () => {


    return (
        <>
            <div className="pro-750-wrapper">

                <main className="pro-750">


                    <MobileUpgradeSection />

                    <MobileTariffSection />

                    <MobileOptionSection />

                    <MobileOpportunitySection />

                    <MobileFAQSection />





                </main>
            </div>
        </>
    )

}

export default MobilePro