//  Resume Validation Methods
 function validateResume(resume) {
    // Get the file extension from the resume
    const fileExtension = resume.split('.').pop().toLowerCase();
    
    // Check if the file extension is allowed
    const allowedExtensions = ['doc', 'docx', 'pdf', 'txt', 'rtf'];
    return allowedExtensions.includes(fileExtension);
}


 // Email validation Methods
 function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S{2,}$/;
    return emailRegex.test(email);
}

module.exports = {
    validateEmail,
    validateResume
}