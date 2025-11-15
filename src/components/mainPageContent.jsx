import { useEffect, useState } from 'react';
import styles from '../styles/mainPageContent.module.css';
import Modal from './Modal';
import Button from './Button';

function MainPageContent(props) {
    // Destrukturyzacja propsów na początku, aby były dostępne w całym komponencie
    const {
        title,
        description,
        baner,
        startDate,
        endDate,
        location,
        rules,
        maxParticipants,
        registrationType,
        tournamentType,
    } = props;

    const [state, setState] = useState("Upcoming");
    const [timeInfo, setTimeInfo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Ten useEffect ustawia stan turnieju (Upcoming, Ongoing, Completed)
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tournamentStartDate = new Date(startDate);
        const tournamentEndDate = new Date(endDate);

        if (tournamentStartDate > today) {
            setState("Upcoming");
        } else if (tournamentEndDate < today) {
            setState("Completed");
        } else {
            setState("Ongoing");
        }
    }, [startDate, endDate]);

    // Ten useEffect tworzy wiadomość do wyświetlenia na podstawie stanu
    useEffect(() => {
        const today = new Date();

        // --- STAN: NADCHODZĄCY ---
        if (state === "Upcoming") {
            const tournamentStartDate = new Date(startDate);

            const diffTime = tournamentStartDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                setTimeInfo("Lauche Today");
            } else if (diffDays === 1) {
                setTimeInfo("Lauche Tomorrow");
            } else if (diffDays > 1 && diffDays <= 31) {
                setTimeInfo(`Lauche in ${diffDays} days`);
            } else if (diffDays > 31) {
                setTimeInfo(`Lauche at ${startDate}`);
            }
        }

        // --- STAN: W TRAKCIE (NOWA LOGIKA) ---
        else if (state === "Ongoing") {
            const tournamentEndDate = new Date(endDate);

            const diffTime = tournamentEndDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                setTimeInfo("Ends Today");
            } else if (diffDays === 1) {
                setTimeInfo("Ends Tomorrow");
            } else {
                setTimeInfo(`Ends in ${diffDays} days`);
            }
        }

        // --- STAN: ZAKOŃCZONY (NOWA LOGIKA) ---
        else if (state === "Completed") {
            const tournamentEndDate = new Date(endDate);

            // Odwracamy odejmowanie, aby uzyskać czas, który upłynął
            const diffTime = today - tournamentEndDate;
            // Używamy Math.floor, bo bardziej naturalnie brzmi "zakończono 1 dzień temu" niż "2 dni temu" jeśli minęło 1.5 dnia
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                setTimeInfo("Ended Today");
            } else if (diffDays === 1) {
                setTimeInfo("Ended 1 day ago");
            } else if (diffDays > 1 && diffDays <= 31) {
                setTimeInfo(`Ended ${diffDays} days ago`);
            } else if (diffDays > 31) {
                setTimeInfo(`Ended at ${endDate}`);
            }
        }
    }, [state, startDate, endDate]); // Ten hook zależy od stanu i dat

    return (
        <>        
        <div className={styles.container} onClick={handleOpenModal}>
            <h3 className={styles.title}>{title}</h3>
            <img src={baner} alt="Tournament Banner" className={styles.banner} />

            <ul className={styles.list}>
                {/* Specjalny styl dla najważniejszej informacji */}
                <li className={styles.timeInfo}>{timeInfo}</li>

                {/* Każdy element listy ma teraz etykietę i wartość */}
                <li>
                    <strong>Location:</strong>
                    <span>{location}</span>
                </li>
                <li>
                    <strong>Max Participants:</strong>
                    <span>{maxParticipants}</span>
                </li>
                <li>
                    <strong>Registration Type:</strong>
                    <span>{registrationType}</span>
                </li>
                <li>
                    <strong>State:</strong>
                    <span>{state}</span>
                </li>
            </ul>
        </div>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <img src={baner} alt="Tournament Banner" className={styles.modalBanner} />
                    <p className={styles.modalDescription}>{description}</p>

                    {/* Używamy nowej klasy dla listy w modalu */}
                    <ul className={styles.modalList}>
                        <li><strong>Localization:</strong> <span>{location}</span></li>
                        <li><strong>Start Date:</strong> <span>{startDate}</span></li>
                        <li><strong>End Date:</strong> <span>{endDate}</span></li>
                        <li><strong>Rules:</strong> <span>{rules}</span></li>
                        <li><strong>Max Participants:</strong> <span>{maxParticipants}</span></li>
                        <li><strong>Registration Type:</strong> <span>{registrationType}</span></li>
                        <li><strong>Tournament Type:</strong> <span>{tournamentType}</span></li>
                        <li><strong>State:</strong> <span>{state}</span></li>
                    </ul>

                    {/* Kontener do stylowania sekcji z przyciskiem */}
                    <div className={styles.modalActions}>
                        {/* Przekazujemy naszą nową klasę do komponentu Button */}
                        <Button name="registration" className={styles.registrationButton} />
                    </div>
                </Modal>
            )
            }
        </>
    );
}

export default MainPageContent;