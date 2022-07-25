function parallax(layer,distance, speed){
    const.item= document.querySelector(layer)
    item.transform ='translateX('+ -distance * speed + 'px)'

}
document.addEventListener('scroll', function(){
    parallax('.floor, parallax.scrollX, 0.5')
})