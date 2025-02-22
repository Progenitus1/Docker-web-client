import Header from '../components/Header';
import { useEffect, useState } from "react";
import styles from '../styles/Logs.module.css';
import { useRouter } from "next/router";

export const Logs = () => {
    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState(false);
    const [logs, setLogs] = useState<any[]>();

    const data = { host: localStorage.getItem("host"), port: localStorage.getItem("port"), containerId: router.query.containerId };

    useEffect(() => {
        fetch('/api/container/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setIsLoaded(true);
                console.log('Success:', data);
                if (data.status == "success") {
                    setLogs(data.data);
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    });

    const errorButton = (e) => {
        e.preventDefault();
        router.push("/");
    }

    return (
        <div>
            <Header />
            <div>
                {!logs ? (
                    <div>
                        <div>Error! </div>
                        < button type="button" onClick={errorButton} style={{ width: "fit-content", margin: "1rem" }
                        }> Try Again </button>
                    </div>
                ) : (
                    <div>
                            <div className={styles.list}>{logs.map(log => <div className = {styles.list__item}>{log}</div>)}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Logs;