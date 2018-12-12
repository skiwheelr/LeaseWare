
export default class CredentialStore
{
    constructror()
    {
	this.storedObject = null;
    }
    store(name)
    {
        this.storedObject = name;
        if (this.hasStorage())
        {
            localStorage.setItem('credentialStore', this.storedObject)
        }
    }
    hasStorage()
    {
        try {

            localStorage.setItem('ite', '');
            localStorage.removeItem('ite','');
        } catch (e)
        {
            return false;
        }
        return true;
    }    
    get()
    {
        if(this.hasStorage())
        {
            this.storedObject = localStorage.getItem('credentialStore')
        }
    	return this.storedObject;
    }   
}
