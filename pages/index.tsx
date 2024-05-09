import { createContext } from 'react'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router';

export const DockerContext = createContext(null)

const Index = () => {
  const router = useRouter()
  const connectDocker = async (event) => {
    event.preventDefault()


    var hostAndPort: string[] = event.target.address.value.split(":", 2)
    localStorage.setItem('host', hostAndPort[0])
    localStorage.setItem('port', hostAndPort[1])
    console.log(JSON.stringify(event.target.admin.checked))
    router.push('/containers?admin=' + String(event.target.admin.checked))

  }

  return (
    <div className={styles.main}>

      <div className={styles.body}>
        <b>Container App</b>
        <div className={styles.login}>
          <label className={styles.text} htmlFor="address">Address and port</label>
          <form className={styles.form} onSubmit={connectDocker}>
            <input
              type="text"
              id="address"
              name="address"
              required
              pattern="[^:]*:[0-9]{1,5}" />
            <label className={styles.text} htmlFor="admin">Administrator privileges</label>
            <input type="radio" name="admin" id="admin"/>
            <button className={styles.button} type="submit">Connect</button>
          </form>

      </div>

      </div>
    </div>
  )
}

export default Index
