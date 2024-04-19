interface ModalBodyInterface {
    children: React.ReactNode
}

const ModalBody = ({ children }: ModalBodyInterface) => {
    return(
        <div className="flex flex-col w-full p-2">
            { children }
        </div>
    );
}

export default ModalBody;