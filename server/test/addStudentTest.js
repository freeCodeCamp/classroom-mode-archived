describe addStudent endpoint
  it should takes student name, email, fCC username, and note and return 200
  it should takes student name, email, fCC username, and note and save student
            ===> mongoose.save function gets called with name, email, fcc username, and the note
  when name is absent
    it returns 422 and student is not saved
    it returns jsons name is required
    
  when email is absent
    it returns 422 and student is not saved
    it returns jsons email is required
    
  when freeCodeCampUsername is absent
    it returns 422 and student is not saved
    it returns jsons freeCodeCampUsername is required
    
  when email is invalid
    it returns 422 and student is not saved
    it returns jsons email is invalid
    
  when freeCodeCampUsername is invalid
    it returns 422 and student is not saved
    it returns jsons freeCodeCamp is invalid
    
    