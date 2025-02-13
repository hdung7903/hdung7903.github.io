CREATE DATABASE SchoolLearning;
USE SchoolLearning;

CREATE TABLE Schools (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    school_name VARCHAR(255) NOT NULL,
    school_code VARCHAR(3) UNIQUE NOT NULL,
    CHECK (school_code REGEXP '^T[0-9]{2}$')
);

CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    school_code VARCHAR(3),
    class_level INT NOT NULL,
    UNIQUE (class_name, school_code),
    FOREIGN KEY (school_code) REFERENCES Schools(school_code),
    CHECK (class_level BETWEEN 1 AND 5)
);

CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(255) NOT NULL,
    teacher_code VARCHAR(8) NOT NULL,
    teacher_gender VARCHAR(10),
    school_code VARCHAR(3),
    UNIQUE (teacher_code, school_code),
    CHECK (teacher_code REGEXP '^[A-Za-z]{2}[0-9]{6}$'),
    -- Ràng buộc CHECK để đảm bảo teacher_code có định dạng 2 chữ và 6 số
    FOREIGN KEY (school_code) REFERENCES Schools(school_code)
);

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_code VARCHAR(8) UNIQUE NOT NULL,
    student_gender VARCHAR(10),
    school_code VARCHAR(3),
    class_level INT NOT NULL,
    class_name VARCHAR(50),
    CHECK (student_code REGEXP '^[A-Za-z]{2}[0-9]{6}$'),
    FOREIGN KEY (class_name) REFERENCES Classes(class_name),
    FOREIGN KEY (school_code) REFERENCES Schools(school_code),
    CHECK (class_level BETWEEN 1 AND 5)
);

CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
);

CREATE TABLE TeacherClasses (
    teacher_code VARCHAR(8),
    class_name VARCHAR(50),
    PRIMARY KEY (teacher_code, class_name),
    FOREIGN KEY (teacher_code) REFERENCES Teachers(teacher_code),
    FOREIGN KEY (class_name) REFERENCES Classes(class_name)
);

CREATE TABLE Documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    document_name VARCHAR(255) NOT NULL,
    description TEXT,
    school_code VARCHAR(3),
    teacher_code VARCHAR(8),
    subject_name INT,
    class_name VARCHAR(50),
    upload_date DATE,
    FOREIGN KEY (school_code) REFERENCES Schools(school_code),
    FOREIGN KEY (teacher_code) REFERENCES Teachers(teacher_code),
    FOREIGN KEY (subject_name) REFERENCES Subjects(subject_name),
    FOREIGN KEY (class_name) REFERENCES Classes(class_name),
    CONSTRAINT fk_teacher_class CHECK (
        EXISTS (
            SELECT 1 FROM TeacherClasses
            -- select 1 la kiem tra su ton tai cua ban ghi
            WHERE TeacherClasses.teacher_code = Documents.teacher_code 
            AND TeacherClasses.class_name = Documents.class_name
        )
    )

);






