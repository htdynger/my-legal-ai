import MobileAccountHeaderSection from "../mobile_widgets/MobileAccountHeaderSection/MobileAccountHeaderSection"
import MobileAccountStatusSection from "../mobile_widgets/MobileAccountStatusSection/MobileAccountStatusSection"
import MobileSettingsOptionsSection from "../mobile_widgets/MobileSettingsOptionsSection/MobileSettingsOptionsSection"
import './MobileSettings.css'
const MobileSettings = () => {

    return (

        <>
            <div className="settings-750-wrapper"> 
                <main className="settings-750">

                    <MobileAccountHeaderSection />

                    <MobileAccountStatusSection />

                    <MobileSettingsOptionsSection />
                </main>
            </div>
        </>
    )
}

export default MobileSettings