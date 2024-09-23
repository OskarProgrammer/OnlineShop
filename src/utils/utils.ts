
export const redirectToPage = ( path : string) => {
    window.location.href = path 
}

export const delay = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const scrollToPos = ( fromTop : number) => {
    window.scrollTo({ top: fromTop, behavior: 'smooth' });
}