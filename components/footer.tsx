import styles from "../styles/Footer.module.scss"
import Link from "next/link";
import Result from "./result";
import React from "react";
import Page_link from "./page_link";

function Footer(props:any){

    let queries = []
    for (let i = 0; i < 10; i++) {
        if (props.data == 0){
            queries.push(parseInt(props.data) + i)
        } else if (props.data == 1){
            queries.push(parseInt(props.data) + i - 1)
        } else {
            queries.push(parseInt(props.data) + i - 2)
        }
    }

    return(
        <footer>
            <div className={styles.pagination}>
                {queries.map((element: any, i:number) => {return(<Page_link data={element} key={i}/>)})}
            </div>
        </footer>
    )
}

export default Footer