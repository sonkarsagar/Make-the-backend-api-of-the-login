const name=document.getElementById('name')
const sur=document.getElementById('sur')
const email=document.getElementById('email')
const password=document.getElementById('password')
const form=document.getElementById('form')
const submit=document.getElementById('submit')

submit.addEventListener('click',(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:3000/data',{
        name: name.value,
        sur: sur.value,
        email: email.value,
        password: password.value
    }).then((result) => {
        
    }).catch((err) => {
        const error=document.createElement('p')
        error.appendChild(document.createTextNode('USER ALREADY EXISTS'))
        form.append(error)
    });
})