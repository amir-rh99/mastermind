interface IColorProps {
    color: string
    index: number
}

const Color = ({ color, index }: IColorProps) => {
    return(
        <button className="square color"
        style={{
            backgroundColor: color,
            border: "1px solid",
            borderColor: color
        }}>
            {index+1}
        </button>
    )
}

export default Color;