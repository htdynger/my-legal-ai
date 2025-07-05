import MobileSettingsPageLayout from "../mobile_widgets/MobileSettingsPageLayout/MobileSettingsPageLayout";
import MobileSettingsLanguageSection from "../mobile_widgets/MobileSettingsLanguageSection/MobileSettingsLanguageSection";

const MobileSettingsLanguage = () => {

    return (
        <>
            <MobileSettingsPageLayout
                headerText={'Язык сайта'} 
                mainTitle={'ЯЗЫК САЙТА'} 
                mainText={'Выберите язык интерфейса. Leg AI может разговаривать на любом языке, вне зависимости от выбора языка интерфейса.'}
            >
                <MobileSettingsLanguageSection />
                
            </MobileSettingsPageLayout>
        </>
    )
}

export default MobileSettingsLanguage