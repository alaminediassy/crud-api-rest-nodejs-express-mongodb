const Student = require("../model/student");


// Récupérer la liste de tous les étudiants
exports.getAllStudents = async (req, res) => {
    try {
        const student = await Student.find();
        res.json(student);
    }
    catch (error) {
        console.log(error)
    }
};

// Récuperer un étudiant par son id
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                error: "student not found"
            });
        }res.json(student);
    }catch (error) {
        console.log(error);
    }
};

// Création d'un étudiant
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student);
    }
    catch (error) {
        console.log(error);
    }
};

// Mise à jour d'un étudiant
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!student) {
            return res.status(404).json({
                success: false,
                error: "Cet étudiant n'existe pas"
            });
        }res.status(200).json({
            success: "Mise à jour des informations de l'étudiant faite avec succès",
            data: student
        });
    }catch (error) {
        console.log(error);
    }
};

// Supprimer un etudiant
exports.deteteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                error: "Cet étudiant n'existe pas"
            });
        }
        res.status(200).json({
            success: "L'étudiant a été supprimer avec succès",
            data: {}
        });
        }catch (error) {
            console.log(error);
        }  
};