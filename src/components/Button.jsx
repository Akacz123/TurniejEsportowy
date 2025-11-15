import styles from '../styles/button.module.css';

function Button(props) {
    return (
        <button className={styles.button}>{props.name}</button>
    );
}

export default Button;