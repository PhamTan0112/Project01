package Model;

import java.util.Arrays;
import java.util.Date;

public class User {
    private String ID;
    private String Name;
    private String Gmail;
    private String Password;
    private String Phone;
    private String Address;
    private boolean Admin;
    private boolean Student;
    private Date Birth;
    private String Encrypt;
    private byte[] Avatar;

    public User(String ID, String name, String gmail, String password, String phone, String address, boolean admin, boolean student, Date birth, String encrypt, byte[] avatar) {
        this.ID = ID;
        Name = name;
        Gmail = gmail;
        Password = password;
        Phone = phone;
        Address = address;
        Admin = admin;
        Student = student;
        Birth = birth;
        Encrypt = encrypt;
        Avatar = avatar;
    }

    public User() {
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getGmail() {
        return Gmail;
    }

    public void setGmail(String gmail) {
        Gmail = gmail;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public boolean isAdmin() {
        return Admin;
    }

    public void setAdmin(boolean admin) {
        Admin = admin;
    }

    public boolean isStudent() {
        return Student;
    }

    public void setStudent(boolean student) {
        Student = student;
    }

    public Date getBirth() {
        return Birth;
    }

    public void setBirth(Date birth) {
        Birth = birth;
    }

    public String getEncrypt() {
        return Encrypt;
    }

    public void setEncrypt(String encrypt) {
        Encrypt = encrypt;
    }

    public byte[] getAvatar() {
        return Avatar;
    }

    public void setAvatar(byte[] avatar) {
        Avatar = avatar;
    }

    @Override
    public String toString() {
        return "User{" +
                "ID='" + ID + '\'' +
                ", Name='" + Name + '\'' +
                ", Gmail='" + Gmail + '\'' +
                ", Password='" + Password + '\'' +
                ", Phone='" + Phone + '\'' +
                ", Address='" + Address + '\'' +
                ", Admin=" + Admin +
                ", Student=" + Student +
                ", Birth=" + Birth +
                ", Encrypt='" + Encrypt + '\'' +
                ", Avatar=" + Arrays.toString(Avatar) +
                '}';
    }
}
