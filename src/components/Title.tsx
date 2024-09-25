
type Props = {
    text : string,
    fontSize : string,
    fontColor : string
}

export const Title = ({ text , fontSize = "text-[30px]", fontColor = "primaryColor"} : Props) => {

    return(
        <p className={`font-bold ${fontSize} ${fontColor}`}>{text}</p>
    )
}