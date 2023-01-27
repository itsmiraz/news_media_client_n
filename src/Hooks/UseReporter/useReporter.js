import { useEffect } from "react"
import { useState } from "react"

const useReporter = email => {
    const [isReporter, setIsReporter] = useState(false)
    const [isReporterLoading, setIsReporterLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://new-media-server.vercel.app/reporter/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsReporter(data.isReporter)
                    setIsReporterLoading(false)
            })
        }
    }, [email])
    return [isReporter,isReporterLoading]
}
export default useReporter