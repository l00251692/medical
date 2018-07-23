package com.changyu.foryou.service;

import java.util.List;
import java.util.Map;

import com.changyu.foryou.model.Employee;


public interface EmployeeService {
	
	Employee selectByPhone(String phone);//根据手机号获取用户信息

	int addEmployee(Map<String, Object> paramMap);
	
	int updateEmployee(Map<String, Object> paramMap);
	
	int delEmployee(Map<String, Object> paramMap);
	
	Employee checkLogin(String phone);
	
	int updateLastLoginTime(Map<String, Object> paramMap);
	
	List<Employee> getAllEmployee(Map<String, Object> paramMap);
	
	List<Employee> selectByPhoneAndPassword(Map<String, Object> paramMap);	
	
	int updatePassword(Map<String, Object> paramMap);
 
}