
// components
import { Item } from "../components/Item"
import { PageTitle } from "../components/PageTitle"

// hooks
import { useItems } from "../hooks/hooks"

// animation
// @ts-ignore 
import ScrollAnimation from 'react-animate-on-scroll'


export const MainPage = () => {

    const { data : items, isLoading } = useItems() 

    return (
        <div className="mainPage">
            <PageTitle title="Crow Shop"/>
            
            {isLoading ? <p>Loading...</p> : ""}

            <div className="itemsContainer">
                {items?.map( (item : any, index : number) => (
                    <ScrollAnimation key={item.id} animateOnce={true} offset={200} duration={1.3}  animatePreScroll={false} animateIn="fadeInUp" >
                        <Item index={index} item={item}/>
                    </ScrollAnimation>
                ))}
            </div>

        </div>
    )
}