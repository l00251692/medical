package com.changyu.foryou.service;

import java.util.Date;
import java.util.Map;

import com.changyu.foryou.model.Employee;


public interface EmployeeService {
	
	Employee selectByPhone(String phone);//根据手机号获取用户信息

	void addEmployee(Employee employee);
	
	Employee checkLogin(String phone);
	
	int updateLastLoginTime(Map<String, Object> paramMap);

}