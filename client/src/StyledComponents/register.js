import styled from "styled-components";

export const RegisterDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 60px);    
`

export const RegisterFrom = styled.form`
    display: flex;
    position: absolute;
    top: 50%;
    transform: translatey(-50%);
    flex-direction: column;
    width: 30%;
    transition: width 0.25s;
    text-align: center;
    input{
        margin-bottom: 0.5rem;
        border-radius: 5px;
        border: 1px solid #000;
        outline: none;
        padding: 0.25rem 0.5rem;
        &:focus{
            border: 1px solid #0083FA;
        }
        
    }
    .redirect_btn{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0.5rem;
        .register_redirect_btn{
            text-decoration: none;
        }
    }    
    @media only screen and (max-width: 992px){
        width: 90%;
    }
`

export const RegisterButton = styled.div`
    display: flex;
    justify-content: center;
    button{
        border: none;
        outline: none;        
        background-color: #FFB200;
        width: 150px;
        padding: 0.5rem 0;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        &:hover{
            background-color:  #ffa600;
        }
    }
`

