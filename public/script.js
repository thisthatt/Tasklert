

const createTask= async(el)=>{
    const titleData = document.getElementById('title')
    console.log(titleData.value)
        
        await fetch('/api/v1/tasks/',{
            method: 'post',
            headers: {'Content-Type':'application/json',
            body:JSON.stringify({'title': titleData.value})
        }
        })
        location.reload()
    
    
    }
    
     const deleteTask = async (el)=>{
        const itemData = el.id
    console.log(itemData)
     try{
    
        const response = await fetch('/api/v1/tasks/'+ itemData, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
            
        })
        
        if(response.status==204) location.reload()
        
        
        }catch(err){
             console.log(err)
        }
    
    
    
     }
    
    
    
     document.getElementsByClassName="delbutton"