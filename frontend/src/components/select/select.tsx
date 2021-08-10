import "./select.scss"

type Props = {
    filter: string,
    setFilter: (title: string) => void
}

export const Select = (props: Props) => {
    return (
        <select className="select-filter" value={props.filter} onChange={e => props.setFilter(e.target.value)}>
            <option>All</option>
            <option>Completed</option>
            <option>Not completed</option>
        </select>
    );
};

