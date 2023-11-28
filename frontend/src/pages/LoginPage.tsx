import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import type { RootState } from "../store"
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const LoginPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userinfo } = useSelector((state : RootState) => state.auth)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitHandler = async (e : any) => {
        try {
            e.preventDefault()
            const response = await login({ email, password }).unwrap()
            dispatch(setCredentials({...response}))
            navigate('/')
        } catch (err : any) {
            toast.error(err?.data?.message || err.error)
        }
    }

    useEffect(() => {
        if(userinfo) {
            navigate('/')
        }
    },[navigate, userinfo])

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            { isLoading && <Loader /> }
            
            <Button type="submit" variant="primary" className="mt-3">
                Sign In
            </Button>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to="/register">Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginPage