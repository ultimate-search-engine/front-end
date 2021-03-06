import styles from "../styles/Form.module.scss"
import {useRouter} from "next/router";
import Image from "next/image";
import Suggester from "./suggester";
import React, {useState} from 'react'

function Form() {
    const router = useRouter()
    const submitSearch = async (event: any) => {
        event.preventDefault()
        await router.push({
                pathname: '/search',
                query: {q: event.target.elements.search.value, length: 16, pagination: "0"}
            },
        )
    }

    const [userQ, setUserQ] = useState(router.query.q ? router.query.q : "")

    const [suggests, setSuggests] = useState<Array<string>>([])

    let suggests_q: string[] = []

    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserQ(event.target.value)
        if (event.target.value.length > 2) {
            suggests_q = [
                "iservery",
                "welcome",
                "ts vs js",
                "nextjs docs",
                "skolaonline",
                "velky krtkus",
                "why not to use any in ts",
                "nfs neni need for speed",
                "what is kvadrant",
                "how to center a div",
            ]
            setSuggests(suggests_q)
        } else {
            setSuggests([])
        }
        changeClass()
    }

    const onInputFocusOut = async (event: React.FocusEvent<HTMLElement>) => {
        const activeNode = event.relatedTarget
        if (activeNode){
            if (activeNode.className.substring(0, 7) != "Suggest"){
                setSuggests([])
            }
        } else {
            setSuggests([])
        }
    }

    const input = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (input.current) {
            input.current.focus()
        }
    }, []);

    const changeClass = () => {
        if (input.current && suggests_q.length){
            input.current.style.borderRadius = "24px 0px 0px"
        } else if (input.current && !suggests_q.length){
            input.current.style.borderRadius = "24px 0px 0px 24px"
        }
    }

    return (
        <>
            <div className={styles.search}>
                <form className={styles.form} onSubmit={submitSearch}>
                    <input id="search" name="search" placeholder="Search..." required={true} autoComplete={"off"}
                           value={userQ} onChange={onInputChange} onBlur={onInputFocusOut} ref={input}/>
                    <button type="submit"><Image src="/magnifying_glass.svg" alt="search" width={19} height={19}/>
                    </button>
                </form>
            </div>
            <div className={styles.suggest_container}>
                {suggests.map((element, i) => {return (<Suggester data={{"element": element, "state": setUserQ, "input": input, "suggests": setSuggests}} key={i}/>)})}
            </div>
        </>
    )
}

export default Form
