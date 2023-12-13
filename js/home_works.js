const gmialInp = document.querySelector('#gmail_input')
const gmialBtn = document.querySelector('#gmail_button')
const gmialResult = document.querySelector('#gmail_result')


const validateGmail = (gmail) => {
    const regExp = /^[a-z0-9._]+gmail\.com$/i
    return regExp.test(gmail)
}

gmialBtn.addEventListener('click', () => {
    const gmail = gmialInp.value.trim()
    if (validateGmail(gmail)){
        gmialResult.style.color = 'green'
        gmialResult.innerHTML = 'адрес норм'
    }else {
        gmialResult.innerHTML = 'адрес не норм'
        gmialResult.style.color = 'red'
    }
})


const parent = document.querySelector('#parent_block')
const child = document.querySelector('#child_block')

const moveRightAndDown = (left, top) => {
    if (left < parent.clientWidth - child.clientWidth){
        left += 1
        child.style.left = `${left} px`
        setTimeout(()=> moveRightAndDown(left, top), 100)
    }else if (top< parent.clientHeight - child.clientHeight){
        top += 1
        child.style.top `${top} px`
        setTimeout(() => moveRightAndDown(left, top), 100)
    }
}

moveRightAndDown(0, 0)


let count = 0
let isCounting = false
let intervalId

const time = document.querySelector('#time_buttons')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const reset = document.getElementById('reset')

const starCounting = () => {
    if (!isCounting) {
        isCounting = true
        intervalId = setInterval(() => {
            count++
            time.textContent = count
        }, 1000)
    }
}

const stopCounting = () =>{
    if (isCounting){
        isCounting = false
        clearInterval(intervalId)
    }
}

const resetCounting = () => {
    stopCounting()
    count
    time.textContent = count
}

start.addEventListener('click', starCounting)
stop.addEventListener('click', stopCounting)
reset.addEventListener('click', resetCounting)
