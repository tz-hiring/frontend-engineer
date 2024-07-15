import styles from './Card.module.css';

export default function Card() {
  return <div>
    <h2>Card</h2>
    <p>Card content</p>
    <button className={styles['button-text']}>Click me</button>
  </div>
}