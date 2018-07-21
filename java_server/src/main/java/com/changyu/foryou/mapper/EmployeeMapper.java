package com.changyu.foryou.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.changyu.foryou.model.Employee;
import com.changyu.foryou.model.Users;

public interface EmployeeMapper {


    int insertSelective(Map<String, Object> paramMap);
    
    int updateEmployee(Map<String, Object> paramMap);
    
    int delEmployee(Map<String, Object> paramMap);

    Employee selectByPrimaryKey(String phone);

    Employee checkLogin(String phone);
    
    int updateLastLoginTime(Map<String, Object> paramMap);
    
    public List<Employee> getAllEmployee(Map<String, Object> paramMap);
    
    public List<Employee> selectByPhoneAndPassword(Map<String, Object> paramMap);
	
	public int updatePassword(Map<String, Object> paramMap);
	
}