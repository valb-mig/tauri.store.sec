interface ModalHeaderInterface {
    children: React.ReactNode
}

const ModalHeader = ({ children }: ModalHeaderInterface) => {
    return(
        <div id="modal-header" className='flex w-full justify-between border-b border-neutral-900 p-2'>
			{ children }	
        </div>
    );
}

export default ModalHeader;