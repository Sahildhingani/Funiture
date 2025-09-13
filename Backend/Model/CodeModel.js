const mongoose = require('mongoose');

const CodeSchema = mongoose.Schema({
    UserEmail: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 180 // 180 seconds = 3 minutes
    }
});

const CodeModel = mongoose.model('CodeModel', CodeSchema);

module.exports = CodeModel;
