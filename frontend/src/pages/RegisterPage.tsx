import { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { setCredentials } from '../slices/authSlice'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userinfo } = useSelector((state : RootState) => state.auth)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [register, setRegister] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const RegisterUser = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_API}/users`, {...register},       {
                withCredentials: true,
              },)
            if(response.status == 201) {
                setIsLoading(false)
                dispatch(setCredentials({...response.data}))
                navigate("/")
            }

        } catch (err : any) {
            setIsLoading(false)
            toast.error(err?.data?.message || err.error)
        }
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [e.target.name] : e.target.value })
    }

    const submitHandler = async (e : any) => {
        e.preventDefault()
        if(register.password !== register.confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            RegisterUser()
        }
    }

    useEffect(() => {
        if(userinfo) {
            navigate('/')
        }
    },[navigate, userinfo])

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChange}
                type='text' placeholder='Enter Name' name="name">
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control onChange={handleChange}
                type='email' placeholder='Enter Email' name="email">
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange}
                type='password' placeholder='Enter Password' name="password">
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={handleChange}
                type='password' placeholder='Confirm Password' name="confirmPassword">
                </Form.Control>
            </Form.Group>

            {isLoading && <Loader />}
            
            <Button type="submit" variant="primary" className="mt-3">
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                    Already Have an account? <Link to="/login">Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterPage