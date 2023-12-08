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

function moveRight(position){
    if (position < parent.clientWidth - child.clientWidth){
        position += 1

        child.style.right = `${position} px`

        setTimeout(() => moveRight(position), 10)
    }
}