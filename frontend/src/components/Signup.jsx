import React, { useEffect, useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';



const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.auth);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v2/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCrendentials: true
            });
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: ""
                })
            }

        } catch (error) {
            console.log("frontend signup error", error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <>
            <div className='flex items-center w-screen h-screen justify-center'>
                <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                    <div className='my-4'>
                        <h1 className='text-center font-bold text-xl my-4'>⚡SOCIAL HUB⚡</h1>
                        <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                    </div>
                    <div>
                        <Label className="">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2"
                        />
                    </div>
                    <div>
                        <Label className="">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2"
                        />
                    </div>
                    <div>
                        <Label className="">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2"
                        />
                    </div>

                    {
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit">Signup</Button>
                        )
                    }
                   
                    <span className='text-center'>Already have an account ? <Link to={"/login"} className='text-blue-700'>Login</Link></span>
                </form>
            </div>
        </>
    )
}

export default Signup;