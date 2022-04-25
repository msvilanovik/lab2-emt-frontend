import React from "react";
import {Link} from "react-router-dom";

const productTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.bookCategory}</td>
            <td>{props.term.author.name + " " + props.term.author.surname}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <button title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </button>
                <Link className={"btn btn-info ms-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <button title={"Mark As Taken"} className={"btn btn-warning ms-2"}
                        onClick={() => props.onMarkAsTaken(props.term.id)}>
                    Mark As Taken
                </button>
            </td>
        </tr>
    )
}

export default productTerm;