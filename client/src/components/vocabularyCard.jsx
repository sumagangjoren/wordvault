import { Menu, MenuButton, MenuItem, MenuItems, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useNavigate } from 'react-router';
import { useState } from 'react'
import { Link } from 'react-router';

function VocabularyCard(props) {

    const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false)

    return (
        <div key={props} className="relative my-4 bg-gray-200" onClick={() => navigate('/show')}>

            <div className="text-h3">{props.title}</div>
            <div>word {props.description}</div>

            <div onClick={(e) => e.stopPropagation()}>
                
                <Menu>
                    <MenuButton className="rounded-full absolute top-2 right-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </MenuButton>

                    <MenuItems anchor="bottom">
                        <MenuItem>
                            <Link to={'/edit'}>
                                <button className="block w-full text-left data-focus:bg-blue-100">
                                    Edit
                                </button>
                            </Link>
                        </MenuItem>
                        {/* <form action="/delete" method="post"> */}
                            <MenuItem>
                                <button type="submit" onClick={() => setIsOpen(true)} className="block w-full text-left data-focus:bg-blue-100">
                                    Delete
                                </button>
                            </MenuItem>
                        {/* </form> */}
                    </MenuItems>
                </Menu>

            </div>

            <div className="grid grid-cols-2 place-content-evenly gap-4">
                <div className="justify-self-start">Tue, 2 December 2025</div>
                <div className="justify-self-end">icons</div>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsOpen(false)}>Cancel</button>
                            <button onClick={() => setIsOpen(false)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>

        
    )
};

export default VocabularyCard;