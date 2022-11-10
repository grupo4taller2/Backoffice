import { Table } from "reactstrap";

export default function InfoTable(props){

    /*
        Info deberia estar en el mismo orden que los heders;
    */
    const headers = props.headers;

    const info = props.info;

    console.log(headers);

    return <Table>
        <thead>
            <tr>
            {headers.map(value => {
                return (<th>
                    {value}
                </th>)    
            })}
            </tr>
        </thead>
        <tbody>
            <tr>
                {info.map(value => {
                    return (<td>
                        {value}
                    </td>)
                })

                }
            </tr>
        </tbody>
    </Table>
}