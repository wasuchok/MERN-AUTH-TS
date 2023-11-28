import { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { setCredentials } from '../slices/authSlice'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userinfo } = useSelector((state : RootState) => state.auth)

    const [profile, setProfile] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })


    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
      setProfile({...profile, [e.target.name] : e.target.value })
    }

    const updateProfile = async () => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API}/users/profile`,{...profile, _id : userinfo._id }, {
          withCredentials: true,
        })
        if(response.status == 200) {
          dispatch(setCredentials({...response.data}))
          toast.success("Profile updated")
        }
      } catch (err : any) {
          toast.error(err?.data?.message || err.error)
      }
    }

    const submitHandler = (e : any) => {
      e.preventDefault()
      if(profile.password != profile.confirmPassword) {
        toast.error('Passwords do not match')
      } else {
        updateProfile()
      }
    }


    useEffect(() => {
      setProfile({...userinfo})
    },[navigate, userinfo])

  return (
    <FormContainer>
        <h1>Update Profile</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChange}
                type='text' placeholder='Enter Name' name="name" value={profile.name}>
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control onChange={handleChange}
                type='email' placeholder='Enter Email' name="email" value={profile.email} disabled>
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
            `   
            <Button type="submit" variant="primary" className="mt-3">
                Update Profile
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ProfilePage