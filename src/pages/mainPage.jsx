import Nav from "../components/nav";
import TitleBar from "../components/titleBar";
import MainPageContent from "../components/mainPageContent";
import styles from "../styles/mainPage.module.css";
import baner from "../assets/baner.jpg";


function MainPage() {
    return (
        <>
            <TitleBar />
            <div className={styles.mainContent}>
                <Nav  />
                <div  className={styles.container}> 
                    <MainPageContent
                        title="Tournament Title"
                        baner={baner}
                        description="This is a description of the tournament."
                        startDate="2025-12-01"
                        endDate="2025-12-10"
                        location="Online"
                        rules="Standard tournament rules apply."
                        maxParticipants={100}
                        registrationType="team"
                    />
                    <MainPageContent
                        title="Tournament Title"
                        baner={baner}
                        description="This is a description of the tournament."
                        startDate="2025-11-14"
                        endDate="2025-11-20"
                        location="Online"
                        rules="Standard tournament rules apply."
                        maxParticipants={100}
                        registrationType="individual"
                    />
                    <MainPageContent
                        title="Tournament Title"
                        baner={baner}
                        description="This is a description of the tournament."
                        startDate="2024-07-01"
                        endDate="2024-07-10"
                        location="Online"
                        rules="Standard tournament rules apply."
                        maxParticipants={100}
                        registrationType="team"
                    />
                    
                </div>
            </div>
        </>
    );
}

export default MainPage;