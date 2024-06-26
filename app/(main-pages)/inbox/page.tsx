/* eslint-disable react/no-unescaped-entities */
import NavBar from '../../components/NavBar';
import { ScrollArea } from "@/components/ui/scroll-area"
import ConvoListItem from '../../components/ConvoListItem';

const InboxPage = () => {

    return (
        <div>
            <div className=' flex items-center justify-center inset-x-0 top-0 border-t  border-grey h-20 shadow-md mb-1 bg-darkGreen'>
            <h1 className='text-center text-xl font-bold text-white'>Messages</h1>
            </div>
            <ScrollArea className="h-[670px] w-[100%] p-1">
                <ConvoListItem/>
                {/*Here map all conversations for user, create a conversation box view for each one, 
                    they should be clickable and navigate to chat view for each (drawer component coming in form the right side)*/}
            </ScrollArea>
            <NavBar />
        </div>
    );
}

export default InboxPage;