package com.changyu.foryou.model;

import java.util.Date;

public class Users {
	
	private String userId;
	
    private String phone;

    private Short  type;

    private String nickname;

    private String imgUrl;

    private Date lastLoginDate;

    private Date createTime;
          
    private Short sex;
    
    private String academy;
    

	public Users(String phone2,  String nickname2) {
		phone=phone2;
		nickname=nickname2;
		type=2;
		createTime=new Date();
		lastLoginDate=new Date();
	}
    
	public Users() {
	}
	
	public Users(String userId2,String nickname2,String imgUrl2,String sex2) {
		userId = userId2;
		nickname = nickname2;
		imgUrl = imgUrl2;
		sex = new Short(sex2);
		type=1;
		createTime=new Date();
		lastLoginDate=new Date();
	}

	public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }


    public Short getType() {
        return type;
    }

    public void setType(Short type) {
        this.type = type;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}


	public Short getSex() {
		return sex;
	}

	public void setSex(Short sex) {
		this.sex = sex;
	}

	public String getAcademy() {
		return academy;
	}

	public void setAcademy(String academy) {
		this.academy = academy;
	}

	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}
}