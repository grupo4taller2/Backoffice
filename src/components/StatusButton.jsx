import React from "react"
import { Button, Spinner } from "reactstrap"


export default function StatusButton(props){
    
    

    return (<Button className={props.className} color={props.color} onClick={props.onPress}>
        {props.loading ? (<React.Fragment>
                         <Spinner size="sm">
                          </Spinner>
                         <span>
                            {' ' + props.loadingText}
                        </span>
                        </React.Fragment>) : props.text}
        </Button>)
}